import { useState, type FormEvent } from "react";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Layers3 } from "lucide-react";
import { useLogin } from "./api/useLogin";
import { Link, useNavigate } from "react-router";
import { route } from "../../../components/routes/route";

const LoginPage = () => {
  const { login } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Pass credentials here if your login hook accepts them.
    login(
      { email, password },
      {
        onSuccess: (result) => {
          if (result.isSuccess) {
            navigate(route.dashboardPath, { replace: true });
            setEmail("");
            setPassword("");
          }
        },
      },
    );
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#080d1d] px-4 py-12 text-white">
      {/* Background lighting */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-[450px] w-[450px] rounded-full bg-indigo-600/20 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-40 -right-32 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[130px]" />

      <div className="relative z-10 w-full max-w-[430px]">
        {/* Logo */}
        <div className="mb-9 flex items-center justify-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500 shadow-lg shadow-indigo-500/25">
            <Layers3 size={24} />
          </div>
          <span className="text-2xl font-bold tracking-wider">NEXUS</span>
        </div>

        {/* Login card */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.045] p-7 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-10">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-3 text-sm text-slate-400">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Email address
              </label>

              <div className="group relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400"
                />

                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-500 hover:border-white/20 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-300"
                >
                  Password
                </label>

                <a
                  href="/forgot-password"
                  className="text-xs font-medium text-indigo-400 transition hover:text-indigo-300"
                >
                  Forgot password?
                </a>
              </div>

              <div className="group relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-12 text-sm text-white outline-none transition-all placeholder:text-slate-500 hover:border-white/20 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-white"
                >
                  {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-slate-600 accent-indigo-500"
              />
              <span className="text-sm text-slate-400">Remember me</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-indigo-500/30 active:translate-y-0"
            >
              Sign in to your account
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </button>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              to={route.registerPath}
              className="font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Sign up
            </Link>
          </p>
        </div>

        <p className="mt-7 text-center text-xs text-slate-600">
          © 2026 Nexus. All rights reserved.
        </p>
      </div>
    </main>
  );
};

export default LoginPage;
