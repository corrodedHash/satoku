import SatFormular from "sat/satFormular";
export default class GameController {
  public formular: SatFormular;
  public view: any;
  public model: any;
  constructor(parentNode: HTMLElement, gameViewClass: any,
              gameModelClass: new(arg0: SatFormular) => void,
              formular: SatFormular) {
    this.formular = formular;

    this.view = new gameViewClass(this.formular, this.clickHandler.bind(this),
                                  parentNode);

    this.model = new gameModelClass(this.formular);

    this.model.variableListeners.push(this.view.setVariable.bind(this.view));
    this.model.clauseListeners.push(this.view.setClause.bind(this.view));

    this.model.updateAll();
  }

  public clickHandler(variableNumber: number) {
    this.model.flipVariableAssignment(variableNumber);
    if (this.model.isWon()) {
      alert("You won!");
    }
  }
}
