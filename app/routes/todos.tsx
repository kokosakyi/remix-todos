import type { ActionFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { useLoaderData, useNavigation, Form, Link } from "@remix-run/react";
import { db } from "~/lib/db.server";

type Todo = {
    id: string;
    title: string;
    description: string | null;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
};

export const loader = async () => {
    try {
        const todos = await db.todo.findMany({
            orderBy: { createdAt: "desc" },
        });
        return json({ todos, success: true });
    } catch (error) {
        console.error("Database error:", error);
        return json({ todos: [], success: false, error: "Failed to load todos" });
    }
};

export const action = async ({ request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const actionType = formData.get("_action");

    try {
        if (actionType === "create") {
            const title = formData.get("title");
            const description = formData.get("description");

            if (typeof title !== "string" || title.length === 0) {
                return json({ error: "Title is required" }, { status: 400 });
            }

            await db.todo.create({
                data: {
                    title,
                    description: typeof description === "string" ? description : null,
                },
            });
        } else if (actionType === "toggle") {
            const id = formData.get("id");
            if (typeof id !== "string") {
                return json({ error: "Invalid todo ID" }, { status: 400 });
            }

            const todo = await db.todo.findUnique({ where: { id } });
            if (!todo) {
                return json({ error: "Todo not found" }, { status: 404 });
            }

            await db.todo.update({
                where: { id },
                data: { completed: !todo.completed },
            });
        } else if (actionType === "delete") {
            const id = formData.get("id");
            if (typeof id !== "string") {
                return json({ error: "Invalid todo ID" }, { status: 400 });
            }

            await db.todo.delete({ where: { id } });
        }

        return redirect("/todos");
    } catch (error) {
        console.error("Database error:", error);
        return json({ error: "Database operation failed" }, { status: 500 });
    }
};

export default function Todos() {
    const data = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <div className="container mx-auto max-w-4xl p-4">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Remix Todos</h1>
                <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    ← Back to Home
                </Link>
            </div>

            {!data.success && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    Failed to connect to database. Please check your environment variables.
                </div>
            )}

            {/* Add new todo form */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
                <Form method="post" className="space-y-4">
                    <input type="hidden" name="_action" value="create" />
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            required
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter todo title..."
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description (optional)
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Enter todo description..."
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Adding..." : "Add Todo"}
                    </button>
                </Form>
            </div>

            {/* Todos list */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Your Todos ({data.todos.length})</h2>
                {data.todos.length === 0 ? (
                    <div className="bg-gray-50 p-8 rounded-lg text-center">
                        <p className="text-gray-500">No todos yet. Add one above to get started!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {data.todos.map((todo: Todo) => (
                            <div
                                key={todo.id}
                                className={`bg-white p-4 rounded-lg shadow-sm border ${todo.completed ? "bg-gray-50 opacity-75" : ""
                                    }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3
                                            className={`font-medium ${todo.completed
                                                ? "line-through text-gray-500"
                                                : "text-gray-900"
                                                }`}
                                        >
                                            {todo.title}
                                        </h3>
                                        {todo.description && (
                                            <p
                                                className={`mt-1 text-sm ${todo.completed ? "text-gray-400" : "text-gray-600"
                                                    }`}
                                            >
                                                {todo.description}
                                            </p>
                                        )}
                                        <p className="mt-2 text-xs text-gray-400">
                                            Created: {new Date(todo.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2 ml-4">
                                        <Form method="post" className="inline">
                                            <input type="hidden" name="_action" value="toggle" />
                                            <input type="hidden" name="id" value={todo.id} />
                                            <button
                                                type="submit"
                                                className={`px-3 py-1 rounded text-sm font-medium ${todo.completed
                                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                                                    : "bg-green-100 text-green-800 hover:bg-green-200"
                                                    }`}
                                            >
                                                {todo.completed ? "Undo" : "Complete"}
                                            </button>
                                        </Form>
                                        <Form method="post" className="inline">
                                            <input type="hidden" name="_action" value="delete" />
                                            <input type="hidden" name="id" value={todo.id} />
                                            <button
                                                type="submit"
                                                className="px-3 py-1 rounded text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200"
                                                onClick={(e) => {
                                                    if (!confirm("Are you sure you want to delete this todo?")) {
                                                        e.preventDefault();
                                                    }
                                                }}
                                            >
                                                Delete
                                            </button>
                                        </Form>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
} 