"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import hero from "@/public/assets/cardImage.jpg";
import { useColors } from "@/context/colorContext";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLoginContext } from "@/context/loginFormContext";
import { useAction } from "next-safe-action/hooks";
import { loginUser } from "@/server/actions/lognUser";
import { toast } from "sonner";

// Define the validation schema with Zod
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const { formData, setFormData } = useLoginContext();
  const colors = useColors();
  let toastId: any;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: formData,
  });
  const { execute, status } = useAction(loginUser, {
    onSuccess({ data }) {
      if (data?.success) {
        toast.success(data.message, {
          id: toastId,
          duration: 3000,
        });
      data.role === "admin"?  router.push("/admin") : router.push("/dashboard");
      }
      if (!data?.success) {
        toast.error(data?.message, {
          id: toastId,
          duration: 3000,
        });
      }
      toast.dismiss(toastId);
    },

    onExecute() {
      toast.loading("Please wait, authenticating user", {
        id: toastId,
      });
    },

    onError(error) {
      if (error.error.fetchError)
        toast.error("Error authenticating this email", {
          id: toastId,
        });
      if (error.error.serverError)
        toast.error("Error connecting to servers", {
          id: toastId,
        });
      if (error.error.validationErrors)
        toast.error("Please check your details", {
          id: toastId,
        });

      toast.dismiss(toastId);
    },
  });
  const onSubmit = (data: LoginFormData) => {
    execute(data);
    setFormData(data);
  };

  return (
    <div className="grid min-h-[100dvh] bg-white w-full grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block /border relative overflow-hidden">
        <Image
          src={hero}
          alt="Login Hero"
          width="1920"
          height="1080"
          className="h-5/6 w-5/6 object-cover"
        />
      </div>
      <div className="flex items-center justify-center mt-9 p-6 lg:p-10">
        <div className="mx-auto w-full max-w-[400px] space-y-6">
          <div className="/space-y-2 /text-center">
            <h1 className="text-2xl font-bold dark:text-neutral-700">
              Welcome Back
            </h1>
            <p className="text-gray-500 /text-sm dark:text-gray-400">
              Enter your email and password to sign in
            </p>
          </div>
          <div className="w-full">
            <div className="w-10 mx-auto h-0.5 rounded-full bg-neutral-300 my-3"></div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2 text-sm">
              <Label htmlFor="email" className="dark:text-neutral-400">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
                className={`${
                  errors.email ? "border-red-500 lowercase" : "lowercase"
                } dark:bg-neutral-100 border-neutral-200 dark:text-neutral-600`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2 text-sm">
              <Label htmlFor="password" className="dark:text-neutral-400">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className={`${
                  errors.password ? "border-red-500 lowercase" : "lowercase"
                } dark:bg-neutral-100 border-neutral-200 dark:text-neutral-600`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              disabled={status === "executing"}
              className="w-full h-12 font-bold flex items-center gap-x-1"
              style={{ backgroundColor: colors.defaultblue }}
            >
              <p>Sign In</p>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
            {/* <Link
              href="#"
              className="inline-block w-full text-right text-xs font-semibold /underline"
              prefetch={false}
            >
              Forgot your password?
            </Link> */}
          </form>
          <div className="flex items-center justify-center">
            <Link
              href="/"
              className="text-sm font-medium text-gray-900 hidden hover:underline"
              prefetch={false}
            >
              Back to Home
            </Link>
            <div className="text-sm text-gray-500 /dark:text-gray-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium text-gray-900 hover:underline "
                prefetch={false}
              >
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
