import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import Account from './Account'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ShowGroceries from './pages/ShowGroceries';
import CreateGrocery from './pages/CreateGrocery';
import ShowGrocery from './pages/ShowGrocery';
import EditGrocery from './pages/EditGrocery';
import DeleteGrocery from './pages/DeleteGrocery';
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";

const App = () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div>
      {!session ? 
        <div className="min-w-full min-h-screen flex items-center justify-center bg-gray-200">
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              variables: {
                dark: {
                  colors: {
                    brandButtonText: 'green'
                  },
                },
              },
            }}
            theme="dark"
            providers={['google', 'apple']}
          />
        </div> : 
        //<Account key={session.user.id} session={session} />}
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/groceries/create' element={<CreateGrocery />} />
          <Route path='/groceries/details' element={<ShowGroceries />} />
          <Route path='/groceries/details/:id' element={<ShowGrocery />} />
          <Route path='/groceries/edit/:id' element={<EditGrocery />} />
          <Route path='/groceries/delete/:id' element={<DeleteGrocery />} />
        </Routes>
        <Footer />
      </div>
      }
    </div>
  );
};

export default App;