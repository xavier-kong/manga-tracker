const sortingHandler = (sorter, a, b) => {
  switch(sorter) {
    case 'timedes':
      return (new Date(b.lastRead).getTime() - new Date(a.lastRead).getTime())
    case 'timeasc':
      return (new Date(a.lastRead).getTime() - new Date(b.lastRead).getTime())
    case 'namedes':
      return a.title.toUpperCase() === b.title.toUpperCase() 
      ? 0 : b.title.toUpperCase() > a.title.toUpperCase() 
      ? 1 : -1
    case 'nameasc':
      return a.title.toUpperCase() === b.title.toUpperCase() 
      ? 0 : a.title.toUpperCase() > b.title.toUpperCase() 
      ? 1 : -1
    default:
      break;
  }
}

export default sortingHandler