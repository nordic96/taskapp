describe('Testing Home Page', () => {
  beforeEach(() => {
    cy.viewport(1360, 900);
    cy.intercept('GET', '/tasks').as('fetchTasks');
    cy.intercept('POST', '/tasks/action/add').as('createTask');
  });

  it('passes rendering necessary components', () => {
    cy.visit('http://localhost:3000');
    cy.get('#task-app-header').should('exist');

    cy.get('#btn-create-task').should('exist');
    cy.get('#label-total').should('exist');
    cy.get('#label-completed').should('exist');
    cy.get('#label-pending').should('exist');
  });

  it('passes fetching tasks', () => {
    cy.wait('@fetchTasks').then((intercept) => {
      expect(intercept.response?.statusCode).equal(200);
      expect(intercept.response?.body).not.to.be.NaN;
    });
  });

  it('passes creating and deleting a task', () => {
    cy.get('#btn-create-task').click();
    cy.get('#create-task-template').should('exist');
    cy.fixture('./sub_task.json').then((data) => {
      cy.get('#input-text-desc').type(data['desc']);
      cy.wait(500);
      cy.get('#input-text-due').type(data['due']);
      cy.wait(500);
      cy.get('#btn-save-task').click();
    });

    cy.wait('@createTask', { timeout: 6000 }).then((intercept) => {
      const body = intercept.response?.body;
      expect(body).not.to.be.NaN;
      expect(intercept.response?.statusCode).equal(200);
      cy.wrap(body).as('created_id');
    });
    cy.wait(1000);
    cy.get('@created_id').then((id) => {
      cy.wait('@fetchTasks', { timeout: 6000 });
      cy.wait(1000);
      cy.scrollTo('bottom');
      cy.get(`#taskbox-${id}000`).should('exist');
    });

    /** Deleting a Task */
    cy.get('@created_id').then((id) => {
      expect(id).not.to.be.NaN;
      cy.get(`#btn-delete-task-${id.toString()}000`).click();
    });
    cy.wait('@fetchTasks', { timeout: 6000 });
  });
});
