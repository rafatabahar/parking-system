import { Level } from '../models/level'

const seedInitialData = async () => {
  const data = await Level.find({}).exec();

  if(data.length !== 0){
    // Data exists, no need to seed
    return;
  }

  console.log("Start seeding...");
  
  const seed1 = Level.build({ name: "B1", number_of_slots: 10 })
  const seed2 = Level.build({ name: "B2", number_of_slots: 4 })
  const seed3 = Level.build({ name: "B3", number_of_slots: 5 })

  await Promise.all([
    seed1.save(),
    seed2.save(),
    seed3.save()
  ])

  console.log("Seeding completed");
};

export default seedInitialData;