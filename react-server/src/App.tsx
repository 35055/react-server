import { useEffect, useState } from "react";
import { Box, TextInput, Group, Button } from "@mantine/core";
import "./App.css";
import { useForm } from "@mantine/form";

const DUMMY_DATA = [
  {
    name: "Murat",
    desc: "I am love my work",
  },
];

function App() {
  const handleInput = (values: { name: string; desc: string }) => {
    DUMMY_DATA.push(values);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://pizza-shop-41b06-default-rtdb.firebaseio.com/items.json"
      );
      const responseData = await response.json();

      console.log(responseData);
    };

    fetchData();
  }, []);

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
        {DUMMY_DATA.map((item, index) => (
          <Box sx={{ display: "flex", gap: "0.5rem" }} key={index}>
            <p>{item.name}</p>
            <p>{item.desc}</p>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default App;
