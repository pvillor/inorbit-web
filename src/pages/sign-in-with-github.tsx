import logo from '../assets/logo-in-orbit.svg'
import { Button } from '../components/ui/button'
import { GithubIcon } from '../components/github-icon'

export function SignInWithGithub() {
  const githubUrl = new URL('https://github.com/login/oauth/authorize')

  githubUrl.searchParams.set('client_id', 'Ov23liw3pXO29zX0QG26')

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-8">
      <img src={logo} alt="in.orbit" />

      <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
        Conclua suas metas semanais, ganhe experiência e suba de nível!
      </p>

      <Button
        className="bg-white text-black hover:bg-white hover:opacity-60"
        asChild
      >
        <a href={githubUrl.toString()}>
          <GithubIcon />
          Entrar com GitHub
        </a>
      </Button>
    </main>
  )
}
