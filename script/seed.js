'use strict'

const db = require('../server/db')
const {User, Products, OrderStatuses} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  try {
    /*------------------------------*/
    /*     users model              */
    /*------------------------------*/
    const users = await Promise.all([
      User.create({email: 'cody@email.com', password: '123'}),
      User.create({email: 'murphy@email.com', password: '123'})
    ])

    console.log(`seeded ${users.length} users`)
    console.log(`seeded users successfully`)
    /*------------------------------*/
    /*     products model           */
    /*------------------------------*/

    // await seed()
    // await Products.bulkCreate(productsData, {validate: true})
    await Promise.all(
      productsData.map(data => {
        return Products.create(data)
      })
    )
    console.log(`seeded ${productsData.length} products`)
    /*------------------------------*/
    /*     orderStatus model           */
    /*------------------------------*/
    await Promise.all([
      OrderStatuses.bulkCreate([
        {
          status: 'draft',
          description: 'items in cart, not purchased'
        },
        {
          status: 'purchased',
          description: 'items purchased, but not shipped'
        },
        {
          status: 'shipped',
          description: 'items shipped, but not deliverd'
        },
        {
          status: 'delivered',
          description: 'items delived'
        }
      ])
    ])

    console.log(`seeded orderStatus successfully`)
  } catch (err) {
    console.error(err)
    //  process.exitCode = 1
  } finally {
    console.log('closing db connection')
    console.log(`seeded successfully`)
  }
}
const productsData = [
  {
    name: 'TITANIUM DIOXIDE, ZINC OXIDE',
    imageUrl: 'http://dummyimage.com/192x121.jpg/5fa2dd/ffffff',
    description:
      'Extraction of Face Subcutaneous Tissue and Fascia, Open Approach',
    price: 11
  },
  {
    name: 'TITANIUM DIOXIDE, ZINC OXIDES',
    imageUrl: 'http://dummyimage.com/109x194.png/ff4444/ffffff',
    description:
      'Supplement Left Tympanic Membrane with Synthetic Substitute, Open Approach',
    price: 46
  },
  {
    name: 'Simvastatin',
    imageUrl: 'http://dummyimage.com/140x218.bmp/ff4444/ffffff',
    description:
      'Occlusion of Splenic Vein with Extraluminal Device, Percutaneous Endoscopic Approach',
    price: 91
  },
  {
    name: 'Zolpidem Tartrate',
    imageUrl: 'http://dummyimage.com/159x136.jpg/5fa2dd/ffffff',
    description:
      'Planar Nuclear Medicine Imaging of Cerebrospinal Fluid using Indium 111 (In-111)',
    price: 46
  },
  {
    name: 'digoxin',
    imageUrl: 'http://dummyimage.com/139x134.bmp/ff4444/ffffff',
    description:
      'Supplement Left Lacrimal Bone with Synthetic Substitute, Percutaneous Approach',
    price: 88
  },
  {
    name: 'Triclosan',
    imageUrl: 'http://dummyimage.com/199x191.jpg/dddddd/000000',
    description: 'Division of Left Glenoid Cavity, Open Approach',
    price: 40
  },
  {
    name: 'Gabapentin',
    imageUrl: 'http://dummyimage.com/247x189.png/ff4444/ffffff',
    description:
      'Introduction of Electrolytic and Water Balance Substance into Genitourinary Tract, Via Natural or Artificial Opening Endoscopic',
    price: 42
  },
  {
    name: 'stannous fluoride',
    imageUrl: 'http://dummyimage.com/210x164.bmp/ff4444/ffffff',
    description:
      'Removal of Nonautologous Tissue Substitute from Cervicothoracic Vertebral Joint, Percutaneous Endoscopic Approach',
    price: 60
  },
  {
    name: 'HOMOSALATE',
    imageUrl: 'http://dummyimage.com/124x214.png/ff4444/ffffff',
    description:
      'Removal of Nonautologous Tissue Substitute from Left Metacarpocarpal Joint, Percutaneous Endoscopic Approach',
    price: 43
  },
  {
    name:
      'Ascorbic Acid, Tocopheryl Acid Succinate, Thiamine, Riboflavin, Niacinamide, Pyridoxine, Folic Acid, Cobalamin, Biotin, Pantothenic Acid, Zinc, Selenium',
    imageUrl: 'http://dummyimage.com/174x228.bmp/ff4444/ffffff',
    description:
      'Drainage of Left Nipple, Via Natural or Artificial Opening Endoscopic, Diagnostic',
    price: 89
  },
  {
    name: 'Duloxetine Hydrochloride',
    imageUrl: 'http://dummyimage.com/215x195.bmp/ff4444/ffffff',
    description:
      'Insertion of Infusion Device into Epididymis and Spermatic Cord, Via Natural or Artificial Opening',
    price: 19
  },
  {
    name: 'TRICLOSAN',
    imageUrl: 'http://dummyimage.com/151x172.png/ff4444/ffffff',
    description:
      'Dilation of Coronary Artery, One Artery, Bifurcation, with Radioactive Intraluminal Device, Percutaneous Approach',
    price: 92
  },
  {
    name: 'ZINC OXIDE, OCTISALATE, OCTINOXATE, TITANIUM DIOXIDE',
    imageUrl: 'http://dummyimage.com/188x108.bmp/5fa2dd/ffffff',
    description:
      'Therapeutic Exercise Treatment of Neurological System - Whole Body',
    price: 17
  },
  {
    name: 'furosemide',
    imageUrl: 'http://dummyimage.com/180x184.png/ff4444/ffffff',
    description:
      'Bypass Right Hypogastric Vein to Lower Vein with Autologous Venous Tissue, Open Approach',
    price: 87
  },
  {
    name: 'PYRITHIONE ZINC',
    imageUrl: 'http://dummyimage.com/134x216.bmp/5fa2dd/ffffff',
    description:
      'Bypass Thoracic Aorta, Descending to Subclavian with Autologous Arterial Tissue, Percutaneous Endoscopic Approach',
    price: 54
  },
  {
    name: 'ALCOHOL',
    imageUrl: 'http://dummyimage.com/159x173.png/dddddd/000000',
    description:
      'Drainage of Right Subclavian Vein with Drainage Device, Percutaneous Endoscopic Approach',
    price: 81
  },
  {
    name: 'TITANIUM DIOXIDE, OCTINOXATE',
    imageUrl: 'http://dummyimage.com/182x145.bmp/dddddd/000000',
    description:
      'Introduction of Radioactive Substance into Upper GI, Via Natural or Artificial Opening Endoscopic',
    price: 37
  },
  {
    name: 'TRICLOSAN',
    imageUrl: 'http://dummyimage.com/158x109.jpg/ff4444/ffffff',
    description: 'Destruction of Peroneal Nerve, Open Approach',
    price: 82
  },
  {
    name: 'LIDOCAINE HYDROCHLORIDE',
    imageUrl: 'http://dummyimage.com/182x223.bmp/5fa2dd/ffffff',
    description: 'Fragmentation in Urethra, External Approach',
    price: 8
  },
  {
    name: 'Doxylamine succinate',
    imageUrl: 'http://dummyimage.com/204x223.bmp/ff4444/ffffff',
    description:
      'Removal of Synthetic Substitute from Facial Bone, Percutaneous Approach',
    price: 19
  }
]

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  try {
    console.log('seeding...')
    await seed()

    await db.close()

    console.log('db connection closed')
  } catch {
    console.error('problem with seeding')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
