CREATE EXTERNAL TABLE FFDraftingToolDB.QBDataSet (
-- column info
    PAy double,
    Age string,
    RuAtt int,
    PAtt int,
    Cmp_perc double,
    Cmp int,
    Ctch_perc double,
    DKPt double,
    Dt date,
    Day string,
    FD_Pt double,
    Fant_Pt double
    Fmd double,
    Fmd double,
    G int,
    H_A string,
    inta int,
    lg string
)
row formatted delimited fields terminated by ','
stored as textfile
location '/ffdraftingtooldb/';
