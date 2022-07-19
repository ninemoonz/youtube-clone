export const trending = (req, res) => res.send("Main page video lists");

export const see = (req, res) => res.send("See Video");
export const edit = (req, res) => res.send("Edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.upload("upload");

export const deleteVideo = (req, res) => res.upload("Delete video");