$(function () {
  $(".change-devoured").on("click", function (event) {
    let id = $(this).data("id");
    let newDevoured = $(this).data("newdevour");

    const newDevouredState = {
      devoured: newDevoured
    };

    // Send PUT request.
    $.ajax("/api/cats/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function () {
        console.log("changed devoured to", newDevoured);
        location.reload();
      }
    );
  });

  $(".create-form").on("submit", function (event) {
    event.preventDefault();

    let newBurger = {
      name: $("#newBurg").val().trim(),
      devoured: false
    };

    // Send POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(
      function () {
        console.log("created new burger");
        location.reload();
      }
    );
  });

  $(".delete-burger").on("click", function (event) {
    let id = $(this).data("id");

    // Send DELETE request.
    $.ajax("/api/burgers/" + id, {
      type: "DELETE"
    }).then(
      function () {
        console.log("deleted burger", id);
        location.reload();
      }
    );
  });
});