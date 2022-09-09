import { Test } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { Cat } from './cat.model';
import { CatsService } from './cats.service';
import { catAdmin } from '../cat-admin/cat-admin.model';

const testCat = { name: 'Test cat', age: 5, breed: 'Russian Blue' };
const testCatAdmin = { name: 'Test cat admin', age: 2, breed: 'Russian Blue', info: 'test info' }

describe('CatsService', () => {
  let service: CatsService;
  let model: typeof Cat;
  let modelAdmin: typeof catAdmin;

  beforeEach(async () => {
    const modRef = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: getModelToken(Cat),
          useValue: {
            findAll: jest.fn(() => [testCat]),
            findOne: jest.fn(),
            create: jest.fn(() => testCat),
            remove: jest.fn(),
          },
        },
        {
          provide: getModelToken(catAdmin),
          useValue: {
            findAll: jest.fn(() => [testCatAdmin]),
          },
        },
      ],
    }).compile();
    service = modRef.get(CatsService);
    model = modRef.get<typeof Cat>(getModelToken(Cat));
    modelAdmin = modRef.get<typeof catAdmin>(getModelToken(catAdmin));
  });

  it('should get the cats', async () => {
    expect(await service.getCats()).toEqual([testCat]);
  });

  it('should add a cat', async () => {
    expect(
      await service.addCat({ name: 'Test', age: 5, breed: 'Russian Blue' }),
    ).toEqual(testCat);
  });

  it('should get a single cat', () => {
    const findSpy = jest.spyOn(model, 'findOne');
    expect(service.getCat('id'));
    expect(findSpy).toBeCalledWith({ where: { id: 'id' } });
  });

  it('should remove a cat', async () => {
    const destroyStub = jest.fn();
    const findSpy = jest.spyOn(model, 'findOne').mockReturnValue({ destroy: destroyStub } as any);
    const retVal = await service.removeCat('id');
    expect(findSpy).toBeCalledWith({ where: { id: 'id' } });
    expect(destroyStub).toBeCalledTimes(1);
    expect(retVal).toBeUndefined();
  });

  it('should get the all data', async () => {
    expect.arrayContaining([expect.objectContaining(testCat)]);
  });
});
