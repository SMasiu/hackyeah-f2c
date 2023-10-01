import "reactflow/dist/style.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { Playground } from "./components/playground/playground";
import { queryClient } from "./http/client";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Playground />
    </QueryClientProvider>
  );
};
