// components/Layout.jsx
const Layout = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar darkMode={darkMode} onThemeChange={toggleTheme} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
