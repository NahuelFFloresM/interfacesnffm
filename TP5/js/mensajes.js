document.addEventListener("DOMContentLoaded", function() {

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })

  document.querySelector('.downvote').addEventListener('click',function(){
    this.classList.toggle('color-rojo');
    let cant = parseInt(this.getAttribute('data-bs-original-title'));
    this.setAttribute('data-bs-original-title',++cant);
  });

  document.querySelector('.upvote').addEventListener('click',function(){
    this.classList.toggle('color-principal');
  });
})