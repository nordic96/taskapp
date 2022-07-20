describe('Tasks API Testing', () => {
    it('fetches tasks- GET', () => {
        cy.request('http://localhost:8080/tasks/').then((res) => {
            expect(res.isOkStatusCode).to.be.true;
            expect(res.body).not.to.be.null;
        });
    });

    it('creates new task - POST', () => {
        cy.fixture('./api_task.json').then((data) => {
            cy.request({
                url: 'http://localhost:8080/tasks/action/add',
                method: 'POST',
                body: data,
            }).then((res) => {
                expect(res.isOkStatusCode).to.be.true;
                expect(res.body).to.equal(data.created);
            });
        });
    });

    it('update new task - PUT', () => {
        cy.fixture('./api_task_update.json').then((data) => {
            cy.request({
                url: 'http://localhost:8080/tasks/action/update/62d2c849a0845cbf75e42653',
                method: 'PUT',
                body: data,
            }).then((res) => {
                expect(res.isOkStatusCode).to.be.true;
                expect(res.body).to.equal(data.created);
            });
        });
    });
});
