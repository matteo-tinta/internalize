export interface IUnitOfWorkRepository {
  commitAsync: (changes: () => Promise<void>) => Promise<void>
}