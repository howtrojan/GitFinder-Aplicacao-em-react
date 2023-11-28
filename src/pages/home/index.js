import {useState} from 'react';
import {Header} from '../../components/header/';
import {Button} from '../../components/button/';
import background from '../../assets/background.png';
import '../home/styles.css';
import '../../components/ItemList';
import ItemList from '../../components/ItemList/';

function App() {
  const [user, setUser] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [repos, setRepos] = useState(null);

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`);
    const newUser = await userData.json();
    
    if (newUser.name){
      const {avatar_url, name, bio , login} = newUser;
      setCurrentUser({avatar_url, name, bio , login});

      const reposData = await fetch(`https://api.github.com/users/${user}/repos`);
      const newRepos = await reposData.json();

      if(newRepos.length){
        setRepos(newRepos);
      }
    }
  }

  const handleRemoveRepo = async (repoId) => {
    // Filtra os repositórios, removendo aquele com o ID correspondente
    const updatedRepos =  await repos.filter(repo => repo.id !== repoId);
    setRepos(updatedRepos);
  };
  



  return (
    <div className="App">   
     <Header />  
    <div className='conteudo'>
      <img src={background} className="background" alt="background-app"/>   
      <div className='info'>
        <div>
          <input name='usuario' value={user} onChange={event => setUser(event.target.value)} placeholder='@username' />
          <button onClick={handleGetData}>Buscar</button>  
        </div> 
          {currentUser?.name ? (<>
            <div className='perfil'>
            <img src={currentUser.avatar_url} className='profile' alt='profile'/>
            <div>
              <h3>{currentUser.name}</h3>
              <span>@{currentUser.login}</span>
              <p>{currentUser.bio}</p>
            </div>            
          </div>
          <hr></hr>
          </>
          ) : null}  
          {repos?.length ? (           
            <div>
            <h4 className='repositorio'>Repositórios</h4>
            {repos.map(repo => (
              <div key={repo.id}>                
                <ItemList title={repo.name} description={repo.description}></ItemList>
                <Button onClick={() => handleRemoveRepo(repo.id)}></Button> 
                <hr></hr>
              </div>
            ))}             
            </div>   
          ) : null}      
    </div>                
    </div>  
    </div>
    
  );
}

export default App;
