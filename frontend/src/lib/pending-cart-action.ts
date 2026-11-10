import { addToCart } from "@/services/cart.service";

const STORAGE_KEY = "pks-pending-cart-action";
const ACTION_TTL_MS = 30 * 60 * 1000;

export type PendingCartAction = {
  productId: string;
  quantity: number;
  variantId?: string;
  createdAt: number;
};

let resumeRequest: Promise<boolean> | null = null;

function isPendingCartAction(
  value: unknown
): value is PendingCartAction {
  if (!value || typeof value !== "object") {
    return false;
  }

  const action = value as Partial<PendingCartAction>;

  return (
    typeof action.productId === "string" &&
    action.productId.length > 0 &&
    Number.isInteger(action.quantity) &&
    Number(action.quantity) > 0 &&
    typeof action.createdAt === "number" &&
    Date.now() - action.createdAt >= 0 &&
    Date.now() - action.createdAt <= ACTION_TTL_MS &&
    (action.variantId === undefined ||
      typeof action.variantId === "string")
  );
}

export function savePendingCartAction(
  action: Omit<PendingCartAction, "createdAt">
): void {
  if (typeof window === "undefined") {
    throw new Error("Cart action can only be saved in a browser.");
  }

  const pendingAction: PendingCartAction = {
    ...action,
    createdAt: Date.now(),
  };

  window.sessionStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(pendingAction)
  );
}

export function resumePendingCartAction(): Promise<boolean> {
  if (resumeRequest) {
    return resumeRequest;
  }

  resumeRequest = (async () => {
    if (typeof window === "undefined") {
      return false;
    }

    const storedAction =
      window.sessionStorage.getItem(STORAGE_KEY);

    if (!storedAction) {
      return false;
    }

    let action: unknown;

    try {
      action = JSON.parse(storedAction);
    } catch (error) {
      console.error("Unable to parse pending cart action:", error);
      window.sessionStorage.removeItem(STORAGE_KEY);
      return false;
    }

    if (!isPendingCartAction(action)) {
      window.sessionStorage.removeItem(STORAGE_KEY);
      return false;
    }

    await addToCart(
      action.productId,
      action.quantity,
      action.variantId
    );

    if (
      window.sessionStorage.getItem(STORAGE_KEY) === storedAction
    ) {
      window.sessionStorage.removeItem(STORAGE_KEY);
    }

    window.dispatchEvent(new Event("cart-updated"));
    return true;
  })().finally(() => {
    resumeRequest = null;
  });

  return resumeRequest;
}
