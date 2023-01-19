const lists = document.querySelector("ul");
const form = document.querySelector("form");
const myLists = document.getElementById("myLists");
const btnModify = document.querySelector(".fa-pen-to-square");
const msgError = document.querySelector(".msgError");
const unique_task = document.querySelector("p .unique_task");
let tabTasksData = JSON.parse(localStorage.getItem("tasks"));
const deleteList = document.querySelectorAll(".fa-sharp");
const button = document.querySelector("button");
let myTask, tabTasks, deleteButton;
const apply_for_date = new Date().toLocaleTimeString().slice(0, 5); //Afficher l'heure actuel de la publication
button.style.display = "none";
/**
 * Parametrer les classes via Tailwindcss
 */
const paramsForClass = {
  param1: "mt-4 ml-8 w-80 rounded-r-lg bg-slate-50 drop-shadow-md", // la balise global de <li></li>
  param2: "flex justify-between text-slate-700",
  param3: "bg-gradient-to-t from-cyan-500 to-blue-500 w-2 h-12 py-8", //barre dégradé de couleur bleu sur le coté gauche
  param4: "flex justify-between mx-auto w-72 ml-2  ", //La balise qui regroupe la tache, l'heure et les buttons
  param5: "flex flex-col justify-center  leading-3 ml-4 mt-1 text-left ", //La balise heure & la tâche
  param6: "unique_task text-2xl font-bold capitalize ", //la balise tâche
  param7:
    "delete_task fa-sharp fa-solid fa-trash w-6 h-6  text-slate-50 pl-1 pt-1 bg-red-500  pt-6 rounded-r-lg h-full", //button pour la suppression
  param8:
    "fa-sharp fa-solid fa-pen-to-square w-6 h-6 rounded-xl bg-orange-400 text-slate-50  pl-1 pt-1 ", //button pour la modification
  param9: "choiceUser flex justify-center items-center space-x-2 -mr-6", //div pour les buttons suppression, validate
};

/**
 * Créer la balise liste
 * @param {*} e
 */
const createElements = () => {
  // Create all elements
  const li = document.createElement("li"),
    div = document.createElement("div"),
    gradiente = document.createElement("div"),
    hoursTaskDeleteModifyDiv = document.createElement("div"),
    hoursTask = document.createElement("div"),
    small = document.createElement("small"),
    deleteModifyDiv = document.createElement("div"),
    paragraphe = document.createElement("p"),
    choiceUser = document.createElement("div"),
    modifyButton = document.createElement("i");
  (deleteButton = document.createElement("i")),
    // Ajouter toutes les éléments dans le DOM
    li.append(div);
  div.appendChild(gradiente);
  div.append(hoursTaskDeleteModifyDiv);
  hoursTaskDeleteModifyDiv.append(hoursTask, choiceUser);
  hoursTask.append(small, paragraphe);
  choiceUser.append(deleteButton, modifyButton);
  //Ajouter un attribut

  let MathRandom = Math.ceil(Math.random() * 100);
  deleteButton.setAttribute("id", "index_" + MathRandom);

  return {
    li,
    div,
    gradiente,
    hoursTaskDeleteModifyDiv,
    hoursTask,
    small,
    deleteModifyDiv,
    paragraphe,
    choiceUser,
    deleteButton,
    modifyButton,
  };
};

/**
 * Mettre une classe sur les balises
 * @param {*} elements
 */
const setClassNames = (elements) => {
  elements.li.className = paramsForClass.param1;
  elements.div.className = paramsForClass.param2;
  elements.gradiente.className = paramsForClass.param3;
  elements.hoursTaskDeleteModifyDiv.className = paramsForClass.param4;
  elements.hoursTask.className = paramsForClass.param5;
  elements.deleteModifyDiv.className = paramsForClass.param5;
  elements.paragraphe.className = paramsForClass.param6;
  elements.choiceUser.className = paramsForClass.param9;
  elements.deleteButton.className = paramsForClass.param7;
};
//Taper sur la barre de recherche, pour rajouter une
search.addEventListener("input", (e) => {
  let valueType = e.target.value;
  myTask = valueType;
});

//Ajouter sur la liste
const setText = (elements, myHour, myParagraphe) => {
  let newTAsks = {
    apply_for_date,
    myTask,
  };
  if (newTAsks.apply_for_date && newTAsks.myTask) {
    tabTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tabTasks.push(newTAsks);
    localStorage.setItem("tasks", JSON.stringify(tabTasks));
  }
  elements.small.innerText = myHour;
  elements.paragraphe.innerText = myParagraphe;
  button.style.display = "block";
  clear.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });
};

/**
 * Ajouter un élément dans la liste
 * @param {*} e
 */
const oneList = (e) => {
  e.preventDefault();
  if (search.value === "") alert("Veuillez mettre une tâche !");
  else if (String(search.value).length > 18)
    msgError.className = "msgError visible text-red-500 font-bold mt-1";
  else {
    search.value = "";
    elements = createElements();
    setClassNames(elements);
    setText(elements, apply_for_date, myTask);
    lists.appendChild(elements.li);
    msgError.className = "msgError hidden";
    location.reload();
  }
};

form.addEventListener("submit", oneList);
/**
 * Afficher la data stocker depuis le localStorage
 */
const recordData = () => {
  if (!Boolean(tabTasksData === null)) {
    tabTasksData
      .sort((a, b) => a.apply_for_date - b.apply_for_date)
      .map((displayTheTask, index) => {
        console.log(index);
        elements = createElements();
        setClassNames(elements);
        setText(elements, displayTheTask.apply_for_date, displayTheTask.myTask);
        deleteButton.setAttribute("data-index", index);
        lists.appendChild(elements.li);
      });
  }
};
recordData();
//Supprimer
document.querySelectorAll(".delete_task").forEach((several_tasks) => {
  several_tasks.addEventListener("click", (e) => {
    const id_Task = document.getElementById(`${e.target.id}`);

    tabTasksData.splice(Number(id_Task.dataset.index), 1);
    localStorage.setItem("tasks", JSON.stringify(tabTasksData));
    e.target.closest("li").remove();
  });
});
