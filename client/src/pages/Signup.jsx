import { Link } from 'react-router-dom';
import { User, Mail, Lock, Github, ArrowRight } from 'lucide-react';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import Card from '../components/Card';

const Signup = () => {
    return (
        <AuthLayout title="Create Account" subtitle="Start your journey to better coding productivity">
            <Card className="p-8 backdrop-blur-xl bg-white/[0.03] border-white/10">
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <Input
                        label="Full Name"
                        placeholder="John Doe"
                        type="text"
                        icon={User}
                    />

                    <Input
                        label="Email Address"
                        placeholder="you@example.com"
                        type="email"
                        icon={Mail}
                    />

                    <Input
                        label="Password"
                        placeholder="••••••••"
                        type="password"
                        icon={Lock}
                    />

                    <Link to="/dashboard" className="block">
                        <Button className="w-full justify-center" variant="primary">
                            Create Account
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </Button>
                    </Link>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-[#0d122f] text-gray-500">Or sign up with</span>
                        </div>
                    </div>

                    <Button type="button" variant="secondary" className="w-full justify-center" icon={Github}>
                        GitHub
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm">
                    <span className="text-gray-400">Already have an account? </span>
                    <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium hover:underline">
                        Sign in
                    </Link>
                </div>
            </Card>
        </AuthLayout>
    );
};

export default Signup;
