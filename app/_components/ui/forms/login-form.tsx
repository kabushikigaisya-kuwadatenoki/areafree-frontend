"use client";
import { Paper, TextInput, Button, Checkbox, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { ComponentWrapper } from "@/app/_components/ui/common/component-wrapper";

export function LoginForm() {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
  });
}
