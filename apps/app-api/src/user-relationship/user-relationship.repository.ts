export interface UserRelationShipService {
  findById();
  findByFromId();
  findByToIdAndStatus();
  findOneByFromIdAndToId();
  save();
  updateStatus();
  delete();
}
