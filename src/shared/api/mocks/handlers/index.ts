import { HttpResponse } from "msw"
import type {ApiSchemas} from "../../schema"
import { http } from "../http"

const boards: ApiSchemas["Board"][] = [
    {
        id: "board-1",
        name: "Marketing Campaign",
    },
    {
        id: "board-2",
        name: "Product Roadmap",
    }
]

export const handlers = [
    http.get("/boards", () => {
        return HttpResponse.json<ApiSchemas["Board"][]>(boards)
    }),
    http.post("/boards", async ({request}) => {
        const data = await request.json()
        const board = {
            id: crypto.randomUUID(),
            name: data.name,
        }
        boards.push(board)
        return HttpResponse.json<ApiSchemas["Board"]>(board, {status: 201})
    }), 
    http.delete("/boards/{boardId}", async ({params}) => {
        const {boardId} = params
        const index = boards.findIndex((board) => board.id === boardId)
        boards.splice(index, 1)

        return HttpResponse.json({code: "OK", message: "Board Deleted"})
    })
]