import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-8 p-6">
      <h1 className="text-3xl font-semibold">Perché?</h1>
      <LoginForm />
    </main>
  );
}