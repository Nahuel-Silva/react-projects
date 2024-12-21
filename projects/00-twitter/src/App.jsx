import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'

export function App () {

    /* Esto es un componente que devuelve un elemento*/
    /* const formatUserName = (userName) => `@${userName}` */ 

    const users = [
        {
          userName: 'gummibeer',
          name: 'gummibeer',
          isFollowing: true
        },
        {
          userName: 'github',
          name: 'github',
          isFollowing: false
        },
        {
            userName: 'PacoHdezs',
            name: 'Paco Hdez',
            isFollowing: true
        },
        {
            userName: 'TMChein',
            name: 'Tomas',
            isFollowing: false
        }
      ]
      

    return (
        <section className='App'>
        {
        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        ))
      }
        </section>
    )
}