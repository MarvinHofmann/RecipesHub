<template>
  <Navbar></Navbar>
  <div class="container mt-3">
    <h1 class="display-4 text-center mb-0 fw-normal">Recipes Hub</h1>
    <p class="text-center text-muted">Willkommen bei dem einzigen Planungstool für Hobbyköche!</p>

    <h2>Rezepte Sammeln</h2>
    <p>
      Bist du es leid, zwischen unzähligen Kochbüchern, Notizen und Online-Rezepten zu suchen, um das perfekte Gericht zu finden? Dieses praktisches
      Tool bietet die Lösung! Sammle alle deine Rezepte an einem zentralen Ort, indem du neue Kreationen hinzufügst und alte Lieblingsrezepte
      aufbewahrst. Mit unseren benutzerfreundlichen Filtern kannst du ganz einfach nach Zutaten, Zubereitungszeit oder speziellen
      Ernährungsbedürfnissen suchen und so die perfekte Mahlzeit auswählen. Verliere nie wieder den Überblick über deine Kochmöglichkeiten -
      organisiere jetzt deine Rezepte mit unserem Tool und lass dich von kulinarischen Kreationen inspirieren!
    </p>
    <h2>Einkaufslisten erstellen</h2>
    <p>
      Mit unserer Einkaufslistenfunktion behältst du immer den Überblick über alle Zutaten, die du für deine geplanten Mahlzeiten brauchst. Kein
      mühsames Durchsuchen des Kühlschranks mehr - plane deine Woche im Voraus und gehe nur noch einmal einkaufen! Mit unserer Funktion zur Anpassung
      der Portionsgrößen kannst du auch spontan Freunde einladen, ohne dir Sorgen machen zu müssen, ob genug Essen für alle da ist. Unser System ist
      so benutzerfreundlich, dass du entweder deine Einkaufsliste ausdrucken oder ganz einfach mobil abrufen kannst. Werde Teil unserer Community und
      lass uns gemeinsam deine Kocherfahrung optimieren!
    </p>
    <h2>Und vieles mehr</h2>
    <p>
      Mit der Funktion zur Wochenplanung kannst du deine Mahlzeiten für die gesamte Woche planen und organisieren - sei es für dich allein oder für
      deine ganze Familie. Aber das ist noch nicht alles! Füge deinen Mahlzeiten tolle Bilder hinzu, um dich noch mehr zu inspirieren, oder
      durchstöbere deine eigene vielfältige Auswahl an Rezepten, um dich an alte Klassiker zu errinern. Du entscheidest, wie du dein kulinarisches
      Erlebnis gestalten möchtest - mit diesem Tool sind deiner Kreativität keine Grenzen gesetzt! Werde jetzt Teil unserer Community und entdecke
      neue kulinarische Horizonte!
    </p>
  </div>
  <Footer></Footer>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    Navbar,
    Footer,
  },
  data() {
    return {};
  },
};
</script>

<style scoped></style>
