angular.module('hackoverflow.comments', [
  'hackoverflow.services',
  'ui.router'
])

.config(function ($httpProvider, $urlRouterProvider, $stateProvider) {
})

.controller('CommentsController',
  function ($scope, $rootScope, $stateParams, $state, Comments,
    Posts, TimeService) {
  $scope.comments = [];
  $scope.post = $stateParams.post;
  $scope.comment = $stateParams.comment;
  $scope.newCommentBody = '';
  $scope.theUser = $rootScope.user;
  $scope.TimeService = TimeService;

  $scope.getComments = function getComments() {
    Comments.getComments($scope.post._id).then(function(data) {
      $scope.comments = data.data;
    });
  };

  $scope.deleteComment = function deleteComment(postId, commentId) {
    Comments.deleteComment(postId, commentId);
    $scope.getComments();
    };

  $scope.deletePost = function deletePost(postId) {
    Posts.deletePost(postId);
    $scope.$emit('addedNewPost');
    $state.go('tab.posts');
  };

  $scope.submit = function (bodyText) {
    Comments.createComment($scope.post._id, bodyText, $rootScope.user, new Date());
    $scope.$$childTail.newCommentBody = null;
    $scope.getComments();
  };

  $scope.getComments();
});
