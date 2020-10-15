import {getRepository} from 'typeorm';
import  Orphanage  from '../models/Orphanages';
import {Request, Response} from 'express';
import orphanageView from '../views/orphanages_view';
import * as yup from 'yup';

export default{
async index(request: Request , response: Response){

  const orphanagesRepository = getRepository(Orphanage);

  const Orphanages = await orphanagesRepository.find({
    relations:['images']
  });
    
  return response.json(orphanageView.renderMany(Orphanages));

},
async show(request: Request , response: Response){
  const {id} = request.params;

  const orphanagesRepository = getRepository(Orphanage);

  const orphanage = await orphanagesRepository.findOneOrFail(id,{relations:['images']});
  
  return response.json(orphanageView.render(orphanage));
  
},

  async create(request: Request , response: Response){
    
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    }= request.body;
    
    const orphanagesRepository = getRepository(Orphanage);
    
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map(image =>{
    return {path: image.filename}})
    
    const data = {
  name,
  latitude,
  longitude,
  about,
  instructions,
  opening_hours,
  open_on_weekends,
  images
}
const schema = yup.object().shape(
{
  name: yup.string().required(),
  latitude: yup.number().required(),
  longitude: yup.number().required(),
  about: yup.string().required().max(300),
  instructions: yup.string().required(),
  opening_hours: yup.string().required(),
  open_on_weekends: yup.boolean().required(),
  images: yup.array(
    yup.object().shape(
      {
        path: yup.string().required()
      }
    )
  )
}  
);
await schema.validate(data,{
  abortEarly: false,
});
    const orphanage = orphanagesRepository.create(data);
    await orphanagesRepository.save(orphanage);

  return response.status(201).json({message: 'Hello World'})
}};
  

