import { useEffect, useState } from "react";
import { Box, TextInput, Group, Button } from "@mantine/core";
import "./App.css";
import { useForm } from "@mantine/form";

function App() {
  const [query, setQuery] = useState(true);
  const initial_url =
    "https://react-http-e79ee-default-rtdb.firebaseio.com/users.json";
  const handleInput = async (values: { name: string; desc: string }) => {
    const response = await fetch(initial_url, {
      method: "POST",
      body: JSON.stringify(values),
    });
    if (response.ok) setQuery(true);
  };

  const handleDelete = async (id: any) => {
    const response = await fetch(
      `https://react-http-e79ee-default-rtdb.firebaseio.com/users/${id}`,
      { method: "DELETE" }
    );
    if (response.ok) setQuery(true);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(initial_url);
      const responseData = await response.json();

      if (!response.ok) console.log("Error");

      const newData: any = [];

      for (let key in responseData) {
        newData.push({
          id: key,
          name: responseData[key].name,
          desc: responseData[key].desc,
        });
      }
      setData(newData);
    };

    if (query) {
      fetchData();
      setQuery(false);
    }
  }, [query]);

  const form = useForm({
    initialValues: {
      name: "",
      desc: "",
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "20px",
        flexDirection: "column",
      }}
      component="div"
      className="App"
    >
      <Box sx={{ fontSize: "30px", color: "purple" }} component="h1">
        Todo List
      </Box>
      <form
        style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}
        onSubmit={form.onSubmit((values) => {
          handleInput(values);
          form.reset();
        })}
      >
        <TextInput
          withAsterisk
          placeholder="Name"
          {...form.getInputProps("name")}
        ></TextInput>
        <TextInput
          withAsterisk
          placeholder="description"
          {...form.getInputProps("desc")}
        ></TextInput>
        <Group position="right" mt="md">
          <Button type="submit">Accept</Button>
        </Group>
      </form>
      <Box>
        {data.map((item:any) => (
          <Box
            sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            key={item.id}
          >
            <p>{item.name}</p>
            <p>{item.desc}</p>
            <Button
              onClick={() => handleDelete(item.id)}
              color="red"
              sx={{ width: "0.7rem", height: "0.9rem" }}
            >
              del
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default App;
