export const MENU_ITEMS = {
  rolls: [
    {
      id: 'r1',
      name: 'California Roll',
      price: 8.50,
      description: 'Roll de cangrejo, aguacate y pepino'
    },
    {
      id: 'r2',
      name: 'Roll de Atún Picante',
      price: 9.50,
      description: 'Roll de atún fresco con salsa picante y cebollín'
    },
    {
      id: 'r3',
      name: 'Dragon Roll',
      price: 12.50,
      description: 'Roll de tempura de langostino cubierto con aguacate y salsa de anguila'
    },
    {
      id: 'r4',
      name: 'Rainbow Roll',
      price: 14.50,
      description: 'California roll cubierto con salmón, atún y pescado blanco'
    }
  ],
  nigiri: [
    {
      id: 'n1',
      name: 'Nigiri de Salmón',
      price: 3.50,
      description: 'Salmón fresco sobre arroz'
    },
    {
      id: 'n2',
      name: 'Nigiri de Atún',
      price: 4.00,
      description: 'Atún rojo sobre arroz'
    },
    {
      id: 'n3',
      name: 'Nigiri de Pez Mantequilla',
      price: 3.50,
      description: 'Pez mantequilla flambeado sobre arroz'
    }
  ],
  especiales: [
    {
      id: 'e1',
      name: 'Tartar de Salmón',
      price: 15.50,
      description: 'Salmón picado con aguacate y salsa ponzu'
    },
    {
      id: 'e2',
      name: 'Tempura de Langostinos',
      price: 13.50,
      description: '6 langostinos en tempura con salsa tentsuyu'
    }
  ]
};

export const formatMenu = (): string => {
  let menuText = '🍣 Nuestro Menú:\n\n';
  
  menuText += '📍 ROLLS:\n';
  MENU_ITEMS.rolls.forEach(item => {
    menuText += `${item.id}. ${item.name} - ${item.price.toFixed(2)}€\n   ${item.description}\n`;
  });
  
  menuText += '\n📍 NIGIRI:\n';
  MENU_ITEMS.nigiri.forEach(item => {
    menuText += `${item.id}. ${item.name} - ${item.price.toFixed(2)}€\n   ${item.description}\n`;
  });
  
  menuText += '\n📍 ESPECIALES:\n';
  MENU_ITEMS.especiales.forEach(item => {
    menuText += `${item.id}. ${item.name} - ${item.price.toFixed(2)}€\n   ${item.description}\n`;
  });
  
  menuText += '\n¿Qué te gustaría pedir? Puedes decirme por ejemplo "2 California Roll" o "1 Nigiri de Salmón"';
  
  return menuText;
};