import { Link } from 'react-router-dom';
import { Mail, Lock, Github, ArrowRight } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const Login = () => {
    return (
        <AuthLayout title="Welcome Back" subtitle="Sign in to continue tracking your productivity">
            <Card className="p-8 backdrop-blur-xl bg-white/[0.03] border-white/10">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        label="Email Address"
                        placeholder="you@example.com"
                        type="email"
                        icon={Mail}
                    />

                    <div className="space-y-1">
                        <Input
                            label="Password"
                            placeholder="••••••••"
                            type="password"
                            icon={Lock}
                        />
                        <div className="flex justify-end">
                            <Link to="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <Link to="/dashboard" className="block">
                        <Button className="w-full justify-center" variant="primary">
                            Sign In
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#0d122f] text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    <Button type="button" variant="secondary" className="w-full justify-center" icon={Github}>
                        GitHub
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-400">Don't have an account? </span>
                    <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">
                        Sign up
                    </Link>
                </div>
            </Card>
        </AuthLayout>
    );
};

export default Login;
