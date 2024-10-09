const parseDate = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}T00:00:00Z`;  // 'YYYY-MM-DD'
  }
  
  const groupItemsByMonthYear = (data) => {
      // para asegurarse que los items estan ordenados por fecha, primero ordeno el source de esa forma
      data.sort((a, b) => new Date(parseDate(a.date)).getTime() - new Date(parseDate(b.date)).getTime());
    
    // reduce permite ir 'acumulando' info en algun formato, en este caso un objeto. Se arranca con el objeto vacio y se acumulan las fechas.
    return data.reduce((acc, currentItem) => {
    
      // Date funciona BIEN con formato ISO, pero como me gusta complicarme la vida.. 
      const normalizedDate = parseDate(currentItem.date);
      const date = new Date(normalizedDate);
      
      // Los meses para JS arrancan de 0, por eso el + 1
      // padStart para hacer la transformacion a 2 digitos, porque getMonth no pasa 01, 02, etc.
      // UTC porque daba error la zona horaria con 01 febrero, lo tomaba como 31 de enero (ejemplo)
      const monthYear = `${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`;
  
      if (!acc[monthYear]) {
        acc[monthYear] = [];
      }
      
      acc[monthYear].push(currentItem);
      //acc[monthYear] = acc[monthYear].concat(currentItem.items);
  
      return acc;
    }, {});
  }
  
  const data = [
    { date: '20/02/2023', items: [{ id: 1 }, { id: 2 }] },
    { date: '10/02/2023', items: [{ id: 3 }] },            // 10 Febrero 2023
    { date: '05/03/2023', items: [{ id: 4 }] },            // 05 Marzo 2023
    { date: '15/02/2023', items: [{ id: 5 }] },            // 15 Febrero 2023
    { date: '20/03/2023', items: [{ id: 6 }] },         	// 20 Marzo 2023
    { date: '01/02/2023', items: [{ id: 7 }] }             // 20 Marzo 2023
  ];
  
  const groupedData = groupItemsByMonthYear(data);
  console.log(groupedData);
