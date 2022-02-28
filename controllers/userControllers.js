import userModel from '../models/userModel.js'


export const getUsers = async (req, res) => {
	const users = await userModel.find({})
	if(!users) {
        res.status(402).send({ message: 'Aucun utilisateur trouvé.'})
    }
    res.send(users)
  }

export const getUser = async (req, res) => {
	const user = await userModel.findById(req.params.idUser)
    .populate('role_id')
    .exec((err, user) => {
    if(!user) {
        res.status(404).send({ 
            message: 'Aucun utilisateur trouvé.'
        })
    }
    if(err) {
        res.status(400).send({
            message: 'Erreur lors de la récupération du user',
            error: err
        })
    }
    res.send(user)
    })
}


export const addUser = async (req, res) => {
	const user = new userModel(req.body)
	await user.save()
    .then(() => {
        res.status(201).send({
            message: 'Utilisateur créé avec succès',
            user: user
        })
    })
    .catch(err => {
        res.status(400).send({
            message: 'Erreur lors de la création de l\'utilisateur',
            error: err
        })
    })
}

export const updateUser = async (req, res) => {
  	const user = await userModel.findByIdAndUpdate(req.params.idUser, ...req.body)
  	await user.save()
      .then(() => {
            res.status(200).send({
                message: 'Utilisateur modifié avec succès',
                user: user
            })
        })
        .catch(err => {
            res.status(400).send({
                message: 'Erreur lors de la modification de l\'utilisateur',
                error: err
            })
        })
}

export const deleteUser = async (req, res) => {
	const user = await userModel.findByIdAndDelete(req.params.idUser)
	if (!user) {
    res.status(400).send({ message: 'Aucun utilisateur trouvé.' })
	}
	res.status(200).send({ message: 'Utilisateur supprimé.' })
}

export const logout = (req, res) => {
    req.logout();
    res.redirect('/');
    }
    

