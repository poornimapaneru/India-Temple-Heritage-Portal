const templeData = [
  {
    name: 'Kedarnath Temple',
    state: 'Uttarakhand',
    city: 'Kedarnath',
    deity: 'Lord Shiva',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kedarnath%20Temple.jpg',
    description:
      'A sacred Himalayan temple dedicated to Lord Shiva and an important pilgrimage destination.',
    history:
      'Kedarnath Temple is an ancient Hindu temple located in the Himalayan region of Uttarakhand and is an important pilgrimage destination dedicated to Lord Shiva.',
    rituals:
      'Daily worship includes traditional prayers, offerings and special rituals dedicated to Lord Shiva.',
    darshan: '4:00 AM - 9:00 PM',
    festivals: 'Maha Shivaratri and other important Hindu festivals',
    guidelines:
      'Visitors should follow temple rules, maintain cleanliness and respect the sacred surroundings.',
    dressCode:
      'Wear clean and modest traditional or comfortable clothing suitable for a religious pilgrimage.',
    accommodation:
      'Hotels, guest houses and dharamshalas are available in and around the pilgrimage area.',
    transport:
      'The temple can be reached through road travel to Gaurikund followed by the pilgrimage route to Kedarnath.',
  },

  {
    name: 'Kashi Vishwanath Temple',
    state: 'Uttar Pradesh',
    city: 'Varanasi',
    deity: 'Lord Shiva',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Kashi%20Vishwanath%20Temple%20in%20Varanasi.jpg',
    description:
      'One of the most revered Shiva temples, located in the historic city of Varanasi.',
    history:
      'Kashi Vishwanath Temple is a historic temple situated in Varanasi and is dedicated to Lord Shiva. It is an important spiritual destination for pilgrims.',
    rituals:
      'The temple follows daily worship, prayers, offerings and traditional ceremonies dedicated to Lord Shiva.',
    darshan: '3:00 AM - 11:00 PM',
    festivals: 'Maha Shivaratri and Dev Deepawali',
    guidelines:
      'Visitors should follow security instructions, maintain discipline and respect temple customs.',
    dressCode:
      'Wear clean and modest clothing and follow the temple dress and entry guidelines.',
  },

  {
    name: 'Jagannath Temple',
    state: 'Odisha',
    city: 'Puri',
    deity: 'Lord Jagannath',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Jagannath%20Temple%20Puri.jpg',
    description:
      'A famous pilgrimage temple known for Lord Jagannath and the annual Rath Yatra festival.',
    history:
      'Jagannath Temple in Puri is one of the major pilgrimage destinations in India and is closely associated with Lord Jagannath.',
    rituals:
      'The temple is known for its daily rituals, traditional offerings and ceremonial worship.',
    darshan: '5:00 AM - 11:00 PM',
    festivals: 'Rath Yatra and Snana Yatra',
    guidelines:
      'Visitors should follow temple entry rules and respect local religious customs.',
  },

  {
    name: 'Tirupati Balaji Temple',
    state: 'Andhra Pradesh',
    city: 'Tirupati',
    deity: 'Lord Vishnu',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Tirupati%20temple.jpg',
    description:
      'A major pilgrimage destination dedicated to Lord Venkateswara, a form of Lord Vishnu.',
    history:
      'Tirupati Balaji Temple, located in Tirumala, is a major pilgrimage centre dedicated to Lord Venkateswara.',
    rituals:
      'The temple follows various traditional worship services, prayers and offerings throughout the day.',
    darshan: 'Varies according to temple schedule',
    festivals: 'Brahmotsavam and other religious festivals',
    guidelines:
      'Visitors should follow the prescribed dress code and temple instructions.',
  },

  {
    name: 'Somnath Temple',
    state: 'Gujarat',
    city: 'Prabhas Patan',
    deity: 'Lord Shiva',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Somnath%20Temple.jpg',
    description:
      'A famous Shiva temple located on the western coast of Gujarat and an important pilgrimage site.',
    history:
      'Somnath Temple is a prominent pilgrimage temple dedicated to Lord Shiva and is located on the coast of Gujarat.',
    rituals:
      'Daily prayers, offerings and traditional Shiva worship are performed at the temple.',
    darshan: '6:00 AM - 10:00 PM',
    festivals: 'Maha Shivaratri and Kartik Purnima',
    guidelines:
      'Visitors should maintain cleanliness and follow temple security and entry instructions.',
  },

  {
    name: 'Meenakshi Amman Temple',
    state: 'Tamil Nadu',
    city: 'Madurai',
    deity: 'Goddess Meenakshi',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Meenakshi%20Temple.jpg',
    description:
      'A historic temple in Madurai known for its magnificent architecture and cultural heritage.',
    history:
      'Meenakshi Amman Temple is a historic temple complex in Madurai known for its architecture, sculptures and religious traditions.',
    rituals:
      'The temple follows traditional daily worship and ceremonies dedicated to Goddess Meenakshi and Lord Sundareswarar.',
    darshan: '5:00 AM - 10:00 PM',
    festivals: 'Meenakshi Thirukalyanam and Chithirai Festival',
    guidelines:
      'Visitors should dress appropriately and respect temple customs and traditions.',
  },

  {
    name: 'Konark Sun Temple',
    state: 'Odisha',
    city: 'Konark',
    deity: 'Surya',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/KONARK%20Sun%20Temple.jpg',
    description:
      'A renowned heritage temple dedicated to the Sun God and famous for its stone chariot architecture.',
    history:
      'Konark Sun Temple is a famous heritage monument dedicated to Surya, the Sun God, and is known for its remarkable stone architecture.',
    rituals:
      'The site represents the historical and cultural traditions associated with Sun worship.',
    darshan: 'Daytime visiting hours',
    festivals: 'Chandrabhaga Mela and other cultural events',
    guidelines:
      'Visitors should protect the heritage structure and follow site preservation rules.',
  },

  {
    name: 'Brihadeeswarar Temple',
    state: 'Tamil Nadu',
    city: 'Thanjavur',
    deity: 'Lord Shiva',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Brihadeeswarar%20Temple.jpg',
    description:
      'A historic Chola-era temple dedicated to Lord Shiva and known for its grand architecture.',
    history:
      'Brihadeeswarar Temple in Thanjavur is a famous historic temple associated with the Chola period and dedicated to Lord Shiva.',
    rituals:
      'Traditional Shiva worship, prayers and offerings are performed according to temple customs.',
    darshan: '6:00 AM - 12:30 PM and 4:00 PM - 8:30 PM',
    festivals: 'Mahashivaratri and other Hindu festivals',
    guidelines:
      'Visitors should maintain cleanliness and respect the temple heritage and religious practices.',
  },

  {
    name: 'Vaishno Devi Temple',
    state: 'Jammu and Kashmir',
    city: 'Katra',
    deity: 'Goddess Vaishno Devi',
    image:
      'https://commons.wikimedia.org/wiki/Special:FilePath/Vaishno%20devi%20temple.jpg',
    description:
      'A major pilgrimage destination located in the Trikuta Hills and dedicated to Goddess Vaishno Devi.',
    history:
      'Vaishno Devi shrine is an important pilgrimage destination located in the Trikuta Hills and associated with Goddess Vaishno Devi.',
    rituals:
      'Pilgrims offer prayers and traditional offerings at the sacred shrine.',
    darshan: 'According to shrine and pilgrimage schedule',
    festivals: 'Navratri and other Hindu festivals',
    guidelines:
      'Pilgrims should follow route, security, environmental and shrine guidelines.',
  },
]

module.exports = templeData