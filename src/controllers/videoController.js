export const trending = (req, res) => res.send("Main page video lists");

export const see = (req, res) => {
    return res.send(`Watch the vid #${req.params.id}`);
};
export const edit = (req, res) => {
    
    return res.send("Edit");
};
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.upload("upload");

export const deleteVideo = (req, res) => {
   
   return res.send("Delete video");
};