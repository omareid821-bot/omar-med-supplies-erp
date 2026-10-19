import seed from '../../lib/seed.json'

export default function handler(req:any,res:any){
  res.status(200).json(seed)
}
