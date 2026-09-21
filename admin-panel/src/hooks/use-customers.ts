"use client";

import {
    useQuery,
} from "@tanstack/react-query";

import {
    getCustomers,
    getCustomerDetails,
    getCustomerStats,
} from "@/services/user.service";

export function useCustomers(
    params?: {
        page?: number;
        limit?: number;
        search?: string;
    }
) {
    return useQuery({
        queryKey: [
            "admin-customers",
            params,
        ],

        queryFn: () =>
            getCustomers(params),

        staleTime:
            30 * 1000,

        retry: 1,
    });
}

export function useCustomerDetails(
    id?: string
) {
    return useQuery({
        queryKey: [
            "admin-customer",
            id,
        ],

        queryFn: () =>
            getCustomerDetails(
                id!
            ),

        enabled:
            Boolean(id),

        staleTime:
            30 * 1000,

        retry: 1,
    });
}

export function useCustomerStats() {
    return useQuery({
        queryKey: [
            "admin-customer-stats",
        ],

        queryFn:
            getCustomerStats,

        staleTime:
            30 * 1000,

        retry: 1,
    });
}