import mongoose from 'mongoose';

const URI = 'mongodb://admin:admin@cluster0-shard-00-00.5p9ll.mongodb.net:27017,cluster0-shard-00-01.5p9ll.mongodb.net:27017,cluster0-shard-00-02.5p9ll.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-133aqa-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(URI)
    
    

export default mongoose;