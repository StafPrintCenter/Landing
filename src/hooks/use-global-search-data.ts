import {
  useServicesStore,
  useProjectsStore,
  useFormationsStore,
  useArticlesStore,
  useFaqsStore
} from "@/stores";

export function useGlobalSearchData() {
  const { services, isLoading: l1 } = useServicesStore({ perPage: 100 });
  const { projects, isLoading: l2 } = useProjectsStore({ perPage: 100 });
  const { formations, isLoading: l3 } = useFormationsStore({ perPage: 100 });
  const { articles, isLoading: l4 } = useArticlesStore({ perPage: 100 });
  const { faqs, isLoading: l5 } = useFaqsStore({ perPage: 100 });

  return {
    services,
    projects,
    formations,
    articles,
    faqs,

    isLoading: l1 || l2 || l3 || l4 || l5,
  };
}