export const useNavbar = () => {
    const isNavbarOpen = useState('isNavbarOpen', () => true);
  
    const toggleNavbar = () => {
      isNavbarOpen.value = !isNavbarOpen.value;
    };
  
    return {
      isNavbarOpen,
      toggleNavbar,
    };
  };