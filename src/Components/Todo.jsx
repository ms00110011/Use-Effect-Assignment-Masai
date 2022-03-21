import React from "react";

export const Todo = () => {
  const [title, setTitle] = React.useState("");
  const [todos, setTodos] = React.useState([]);
  const [loading,setLoading] = React.useState(true);
  const [error,setError] = React.useState(false);
  const [page,setPage] = React.useState(1)

  const perPage = 2

  React.useEffect(() => {
    getTodos();
  },[page]);

  const getTodos = () => {
    setLoading(true)
    fetch(`http://localhost:3004/todos?_page=${page}&_limit=${perPage}`)
      .then((res) => res.json())
      .then((res) =>{ setTodos(res)
        setError(false)
      })
      .catch((err) => setError(true))
      .finally(()=> setLoading(false));
  };

  const handleAdd = () => {
    const payload = {
      task: title,
      status: false,
    };

    const payloadjson = JSON.stringify(payload);

    fetch(`http://localhost:3004/todos`, {
      method: "POST",
      body: payloadjson,
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      getTodos();
    })
    .catch((res)=>setError(true))
    .finally(()=>setLoading(false))
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3004/todos/` + id, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => getTodos())
      .catch((err) => console.log(err));
  };

  return loading ? 
  <div>Loading...</div>:error? 
  <div>Error....Something went wrong.</div>: (
    <div>
      <input
        type="text"
        placeholder="Add Task"
        onChange={(e) => setTitle(e.target.value)}
      />

      <button onClick={handleAdd}>ADD</button><br />

      {todos.map((item, i) => {
        return (
          <>
            <h1 key={i}>{item.task}</h1>
            <button onClick={() => handleDelete(item.id)}>Delete</button><br />
          </>
        );
      })}

      <button onClick={()=>setPage(page-1)} disabled={page===1}>PREV</button>
      <button onClick={()=>setPage(page+1)} disabled={todos.length<perPage}>NEXT</button>


    </div>
  );
};
