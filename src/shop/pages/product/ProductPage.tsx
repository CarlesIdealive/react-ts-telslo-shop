import { useAuthStore } from "@/auth/store/auth.store";

export const ProductPage = () => {
  const { getUser } = useAuthStore();

  return (
    <>
      <h1>Product Page</h1>
      <pre>{JSON.stringify(getUser(), null, 2)}</pre>
    </>
  );
};
