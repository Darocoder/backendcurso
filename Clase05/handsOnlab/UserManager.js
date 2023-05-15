getUsuarios = async() =>{
    if(fs.existsSync(path)){
        const data = await fs.promises.readFile(path,'utf-8');
        const users = JSON.parse(data);
        return users
    }else{
        return [];
    }
}

crearUsuario = async(usuario) =>{
    const usuarios = await this.getUsuarios();

    usuario.salt = crypto.randomBytes(128).toString('base64');
    usuario.contrasena = crypto.createHmac('sha256', usuario.salt).update(usuario.contrasena).digest('hex');

    usuarios.push(usuario);
    await fs.promises.writeFile(path,JSON.stringify(usuarios,null,'\t'));
}