import { rqClient } from "@/shared/api/instance";
import { useQueryClient } from "@tanstack/react-query";
import type { SubmitEvent, SubmitEventHandler } from "react";

function BoardsListPage() {
  const queryClient = useQueryClient();
  const boardsQuery = rqClient.useQuery("get", "/boards");
  const createBoardMutation = rqClient.useMutation("post", "/boards", {
    onSuccess: async () => {
      await queryClient.invalidateQueries(
        rqClient.queryOptions("get", "/boards"),
      );
    },
  });
  const deleteBoardMutation = rqClient.useMutation(
    "delete",
    "/boards/{boardId}",
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          rqClient.queryOptions("get", "/boards"),
        );
      },
    },
  );

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    console.log(e.target, formData);

    createBoardMutation.mutate({
      body: {
        name: formData.get("name") as string,
      },
    });
  };
  const handleDelete = (boardId: string) => {
    deleteBoardMutation.mutate({
      params: {
        path: {
          boardId,
        },
      },
    });
  };

  return (
    <div>
      <h1>BoardListPage</h1>
      {boardsQuery.data?.map((board) => (
        <div key={board.name}>
          <h3>{board.name}</h3>
          <button onClick={() => handleDelete(board.id)}>delete</button>
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input name="List Data" />
        <button disabled={createBoardMutation.isPending} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export const Component = BoardsListPage;
