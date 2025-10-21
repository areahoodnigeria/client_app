import { create } from "zustand";
import { getOrganization, getOrganizations } from "../api/organizationApi";

type OrganizationLocation = { city?: string; state?: string };
export interface Organization {
  id?: string;
  _id?: string;
  business_name?: string;
  name?: string;
  profile_picture?: { url?: string } | null;
  logo?: { url?: string } | null;
  location?: OrganizationLocation | null;
  city?: string;
  state?: string;
  cover_photo?: { url?: string } | null;
  coverPhoto?: { url?: string } | null;
  contact_email?: string;
  email?: string;
  contact_phone?: string;
  phone?: string;
  address?: string;
}

type OrganizationsMetadata = { total_pages?: number; totalPages?: number };

export type DiscoverState = {
  organizations: Organization[];
  page: number;
  limit: number;
  totalPages: number;
  search: string;
  loading: boolean;
  error: string | null;
  selectedOrg: Organization | null;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  loadOrganizations: () => Promise<void>;
  loadOrganization: (id: string) => Promise<void>;
};

const useDiscoverStore = create<DiscoverState>((set, get) => ({
  organizations: [],
  page: 1,
  limit: 10,
  totalPages: 1,
  search: "",
  loading: false,
  error: null,
  selectedOrg: null,

  setSearch: (search: string) => set({ search, page: 1 }),
  setPage: (page: number) => set({ page }),

  loadOrganizations: async () => {
    const { page, limit, search } = get();
    set({ loading: true, error: null });

    try {
      const { data, metadata } = (await getOrganizations({
        page,
        limit,
        search,
      })) as { data: Organization[]; metadata?: OrganizationsMetadata };
      set({
        organizations: data,
        totalPages: metadata?.total_pages || metadata?.totalPages || 1,
      });
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load organizations",
      });
    } finally {
      set({ loading: false });
    }
  },

  loadOrganization: async (id: string) => {
    set({ loading: true, error: null, selectedOrg: null });
    try {
      const org = (await getOrganization(id)) as Organization | null;
      set({ selectedOrg: org ?? null });
    } catch (err: any) {
      set({
        error:
          err?.response?.data?.message ||
          err?.message ||
          "Failed to load organization",
      });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useDiscoverStore;
