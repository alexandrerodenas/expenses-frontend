# Improvement points
* Pagination
  * Page indexes should be limited to few values 
* Add error management
* Dtos update/create expense are redundant with edition/creation forms
* Mapping from form to dtos could be extracted in dedicated services
* Create test doubles in dedicated class to facilitate reuse

# Remarks
* Date of purchase is returned in datetime format but can only be updated in date format. Leading to a lost of time information when updating.

Time spend: ~15h  
Development environment: Intellj on osx
