export interface IMapper<TDomain, TReadModel, TWriteModel> {
    toDomain(raw: TReadModel): TDomain;
    toPersistence(domain: TDomain): TWriteModel;
}