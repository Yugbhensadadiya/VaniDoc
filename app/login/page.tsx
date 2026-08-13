import { AuthShell } from '@/components/auth-shell'

export const metadata = { title: 'Sign in — VaaniDoc', description: 'Securely access your VaaniDoc healthcare workspace.' }

export default function LoginPage() { return <AuthShell mode="login" /> }
