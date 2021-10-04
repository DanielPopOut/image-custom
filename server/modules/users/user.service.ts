import { userDbService, UserDbService } from './user.dbService';

class UserService {
  constructor(private userDbService: UserDbService) {}
  findOneById = async (userId: string) => {
    const user = await this.userDbService.getOneById(userId);
    return user;
  };
}

export const userService = new UserService(userDbService);
