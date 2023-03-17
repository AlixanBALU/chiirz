<?php

namespace Container0Fkl6xp;


use Symfony\Component\DependencyInjection\Argument\RewindableGenerator;
use Symfony\Component\DependencyInjection\Exception\RuntimeException;

/**
 * @internal This class has been auto-generated by the Symfony Dependency Injection Component.
 */
class get_ServiceLocator_W3MGG_MService extends App_KernelDevDebugContainer
{
    /**
     * Gets the private '.service_locator.w3MGG.m' shared service.
     *
     * @return \Symfony\Component\DependencyInjection\ServiceLocator
     */
    public static function do($container, $lazyLoad = true)
    {
        return $container->privates['.service_locator.w3MGG.m'] = new \Symfony\Component\DependencyInjection\Argument\ServiceLocator($container->getService, [
            'App\\Controller\\CommentController::delete' => ['privates', '.service_locator.KBkob.L', 'get_ServiceLocator_KBkob_LService', true],
            'App\\Controller\\CommentController::edit' => ['privates', '.service_locator.KBkob.L', 'get_ServiceLocator_KBkob_LService', true],
            'App\\Controller\\CommentController::index' => ['privates', '.service_locator.VXcOMBY', 'get_ServiceLocator_VXcOMBYService', true],
            'App\\Controller\\CommentController::new' => ['privates', '.service_locator.VXcOMBY', 'get_ServiceLocator_VXcOMBYService', true],
            'App\\Controller\\CommentController::show' => ['privates', '.service_locator.PK5KVtZ', 'get_ServiceLocator_PK5KVtZService', true],
            'App\\Controller\\ItineraryController::delete' => ['privates', '.service_locator.i7Z4iXc', 'get_ServiceLocator_I7Z4iXcService', true],
            'App\\Controller\\ItineraryController::edit' => ['privates', '.service_locator.i7Z4iXc', 'get_ServiceLocator_I7Z4iXcService', true],
            'App\\Controller\\ItineraryController::index' => ['privates', '.service_locator.GNsQvUC', 'get_ServiceLocator_GNsQvUCService', true],
            'App\\Controller\\ItineraryController::new' => ['privates', '.service_locator.GNsQvUC', 'get_ServiceLocator_GNsQvUCService', true],
            'App\\Controller\\ItineraryController::show' => ['privates', '.service_locator.dwdKY9r', 'get_ServiceLocator_DwdKY9rService', true],
            'App\\Controller\\UserController::delete' => ['privates', '.service_locator.9uW928t', 'get_ServiceLocator_9uW928tService', true],
            'App\\Controller\\UserController::edit' => ['privates', '.service_locator.9uW928t', 'get_ServiceLocator_9uW928tService', true],
            'App\\Controller\\UserController::index' => ['privates', '.service_locator.Q1F27w5', 'get_ServiceLocator_Q1F27w5Service', true],
            'App\\Controller\\UserController::new' => ['privates', '.service_locator.Q1F27w5', 'get_ServiceLocator_Q1F27w5Service', true],
            'App\\Controller\\UserController::show' => ['privates', '.service_locator.4T4EJFR', 'get_ServiceLocator_4T4EJFRService', true],
            'App\\Kernel::loadRoutes' => ['privates', '.service_locator.xUrKPVU', 'get_ServiceLocator_XUrKPVUService', true],
            'App\\Kernel::registerContainerConfiguration' => ['privates', '.service_locator.xUrKPVU', 'get_ServiceLocator_XUrKPVUService', true],
            'kernel::loadRoutes' => ['privates', '.service_locator.xUrKPVU', 'get_ServiceLocator_XUrKPVUService', true],
            'kernel::registerContainerConfiguration' => ['privates', '.service_locator.xUrKPVU', 'get_ServiceLocator_XUrKPVUService', true],
            'App\\Controller\\CommentController:delete' => ['privates', '.service_locator.KBkob.L', 'get_ServiceLocator_KBkob_LService', true],
            'App\\Controller\\CommentController:edit' => ['privates', '.service_locator.KBkob.L', 'get_ServiceLocator_KBkob_LService', true],
            'App\\Controller\\CommentController:index' => ['privates', '.service_locator.VXcOMBY', 'get_ServiceLocator_VXcOMBYService', true],
            'App\\Controller\\CommentController:new' => ['privates', '.service_locator.VXcOMBY', 'get_ServiceLocator_VXcOMBYService', true],
            'App\\Controller\\CommentController:show' => ['privates', '.service_locator.PK5KVtZ', 'get_ServiceLocator_PK5KVtZService', true],
            'App\\Controller\\ItineraryController:delete' => ['privates', '.service_locator.i7Z4iXc', 'get_ServiceLocator_I7Z4iXcService', true],
            'App\\Controller\\ItineraryController:edit' => ['privates', '.service_locator.i7Z4iXc', 'get_ServiceLocator_I7Z4iXcService', true],
            'App\\Controller\\ItineraryController:index' => ['privates', '.service_locator.GNsQvUC', 'get_ServiceLocator_GNsQvUCService', true],
            'App\\Controller\\ItineraryController:new' => ['privates', '.service_locator.GNsQvUC', 'get_ServiceLocator_GNsQvUCService', true],
            'App\\Controller\\ItineraryController:show' => ['privates', '.service_locator.dwdKY9r', 'get_ServiceLocator_DwdKY9rService', true],
            'App\\Controller\\UserController:delete' => ['privates', '.service_locator.9uW928t', 'get_ServiceLocator_9uW928tService', true],
            'App\\Controller\\UserController:edit' => ['privates', '.service_locator.9uW928t', 'get_ServiceLocator_9uW928tService', true],
            'App\\Controller\\UserController:index' => ['privates', '.service_locator.Q1F27w5', 'get_ServiceLocator_Q1F27w5Service', true],
            'App\\Controller\\UserController:new' => ['privates', '.service_locator.Q1F27w5', 'get_ServiceLocator_Q1F27w5Service', true],
            'App\\Controller\\UserController:show' => ['privates', '.service_locator.4T4EJFR', 'get_ServiceLocator_4T4EJFRService', true],
            'kernel:loadRoutes' => ['privates', '.service_locator.xUrKPVU', 'get_ServiceLocator_XUrKPVUService', true],
            'kernel:registerContainerConfiguration' => ['privates', '.service_locator.xUrKPVU', 'get_ServiceLocator_XUrKPVUService', true],
        ], [
            'App\\Controller\\CommentController::delete' => '?',
            'App\\Controller\\CommentController::edit' => '?',
            'App\\Controller\\CommentController::index' => '?',
            'App\\Controller\\CommentController::new' => '?',
            'App\\Controller\\CommentController::show' => '?',
            'App\\Controller\\ItineraryController::delete' => '?',
            'App\\Controller\\ItineraryController::edit' => '?',
            'App\\Controller\\ItineraryController::index' => '?',
            'App\\Controller\\ItineraryController::new' => '?',
            'App\\Controller\\ItineraryController::show' => '?',
            'App\\Controller\\UserController::delete' => '?',
            'App\\Controller\\UserController::edit' => '?',
            'App\\Controller\\UserController::index' => '?',
            'App\\Controller\\UserController::new' => '?',
            'App\\Controller\\UserController::show' => '?',
            'App\\Kernel::loadRoutes' => '?',
            'App\\Kernel::registerContainerConfiguration' => '?',
            'kernel::loadRoutes' => '?',
            'kernel::registerContainerConfiguration' => '?',
            'App\\Controller\\CommentController:delete' => '?',
            'App\\Controller\\CommentController:edit' => '?',
            'App\\Controller\\CommentController:index' => '?',
            'App\\Controller\\CommentController:new' => '?',
            'App\\Controller\\CommentController:show' => '?',
            'App\\Controller\\ItineraryController:delete' => '?',
            'App\\Controller\\ItineraryController:edit' => '?',
            'App\\Controller\\ItineraryController:index' => '?',
            'App\\Controller\\ItineraryController:new' => '?',
            'App\\Controller\\ItineraryController:show' => '?',
            'App\\Controller\\UserController:delete' => '?',
            'App\\Controller\\UserController:edit' => '?',
            'App\\Controller\\UserController:index' => '?',
            'App\\Controller\\UserController:new' => '?',
            'App\\Controller\\UserController:show' => '?',
            'kernel:loadRoutes' => '?',
            'kernel:registerContainerConfiguration' => '?',
        ]);
    }
}
